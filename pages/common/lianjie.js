let bleControl = null
let bleConnectDeviceID = null
let currentDevice = {}
let writeData = {
	device: {},
	serviceID: '',
	characteristicID: ''
}
import {
	BLUE_STATE
} from "./data.js"
export const Blue = {
	/**
	 * 蓝牙连接状态：200-> 已连接；-1 ->未连接
	 */
	connectState: -1,

	// 开始蓝牙设备扫描
	start() {
		bleControl = BleProtocol
		this._lastLockData = ""
		if (bleConnectDeviceID) { // 设备已连接
			this.connectState = 200
			bleControl.connectStateListen(BLUE_STATE.CONNECTSUCCESS);
			return
		};
		bleControl.connectStateListen(BLUE_STATE.READY)
		// 打开蓝牙适配器
		uni.openBluetoothAdapter({
			success: (res) => {
				this.startBluetoothDevicesDiscovery()
			},
			fail: (res) => {
				console.error('打开蓝牙适配器失败：', res);
				if (res.errCode === 10001) {
					bleControl.connectStateListen(BLUE_STATE.UNAVAILABLE)
				}
				// Android 系统特有，系统版本低于 4.3 不支持 BLE
				if (res.errCode === 10009) {
					bleControl.connectStateListen(BLUE_STATE.VERSIONLOW)
				}
				if (res.errCode === 10008) {
					bleControl.connectStateListen(BLUE_STATE.SYSTEMERROR)
				}
			},
			complete: () => {
				// 监听蓝牙适配器状态
				uni.onBluetoothAdapterStateChange(res => {
					console.log('蓝牙适配器状态：', res);
					if (res.available) {
						this._isDiscovering = res.discovering
						bleControl.connectStateListen(BLUE_STATE.READYAGAIN)
						this.startBluetoothDevicesDiscovery()
					} else {
						// 蓝牙模块未开启
						bleControl.connectStateListen(BLUE_STATE.UNAVAILABLE)
					}
				})
			}
		})
	},

	// 关闭蓝牙连接，关闭状态监听，初始化状态
	stop() {
		if (bleConnectDeviceID) {
			uni.closeBLEConnection({
				deviceId: bleConnectDeviceID
			})
		}
		writeData = {}
		bleConnectDeviceID = null
		this.connectState = -1
		this._isDiscovering = false
		uni.closeBluetoothAdapter()
		uni.offBluetoothAdapterStateChange()
		uni.offBLEConnectionStateChange()
		uni.stopBluetoothDevicesDiscovery()
	},
	// 停止蓝牙扫描
	stopBluetoothDevicesDiscovery() {
		uni.stopBluetoothDevicesDiscovery()
	},
	// 开始蓝牙扫描
	startBluetoothDevicesDiscovery() {
		if (this._isDiscovering) return
		this._isDiscovering = true

		uni.startBluetoothDevicesDiscovery({
			allowDuplicatesKey: true,
			success: (res) => {
				bleControl.connectStateListen(BLUE_STATE.SCANING)
				this.onBluetoothDeviceFound()
			},
			fail: (res) => {
				console.log('位置失败--', res);
				if (res.errCode === -1 && (res.errno === 1509008 || res.errno === 1509009)) {
					this.stop()
					bleControl.connectStateListen(BLUE_STATE.NOLOCATIONPERMISSION)
				}
			}
		})
	},
	// 搜索附近设备
	onBluetoothDeviceFound() {
		uni.onBluetoothDeviceFound(res => {
			res.devices.forEach(device => {
				// device = {
				// 	RSSI: -50,
				// 	advertisData: ArrayBuffer(19),
				// 	advertisServiceUUIDs: Array(2),
				// 	connectable: true,
				// 	deviceId: "EE59532DF324-4SFSD-34635D-BB893-76SGSDFV",
				// 	localName: "shebeimingcheng",
				// 	name: "shebeimingcheng", 
				// }
				if (device.name !== 'shebeimingcheng') return

				let abHex = this.ab2hex(device.advertisData)
				let mac = this.ab2hex(device.advertisData.slice(2, 8), ':').toUpperCase()
				device.macAddr = mac
				// 根据自己的设备修改
				if (abHex.length == 38) {
					this.stopBluetoothDevicesDiscovery()
					this.createBLEConnection(device)
				}
			})
		})
	},
	// 创建蓝牙连接
	createBLEConnection(device) {
		if (bleConnectDeviceID == null) {
			bleConnectDeviceID = device.deviceId
			uni.createBLEConnection({
				deviceId: device.deviceId,
				success: res => {
					currentDevice = device
					this.connectState = 200
					// 蓝牙连接成功，上报设备信息
					bleControl.connectStateListen({
						...BLUE_STATE.CONNECTSUCCESS,
						deviceInfo: {
							...device
						}
					})
					this.getBLEDeviceServices(device)
					this.onBLEConnectionStateChange()
				},
				fail: (err) => {
					bleControl.connectStateListen(BLUE_STATE.CONNECTFAILED)
				},
			})
		}
	},
	// 监听连接状态
	onBLEConnectionStateChange() {
		uni.onBLEConnectionStateChange(res => {
			console.log('蓝牙连接状态: ', res);
			if (!res.connected) {
				bleControl.connectStateListen(BLUE_STATE.DISCONNECT)
				this.stop()
			}
		});
	},
	// 获取设备服务
	getBLEDeviceServices(device) {
		uni.getBLEDeviceServices({
			deviceId: device.deviceId,
			success: res => {
				for (let i = 0; i < res.services.length; i++) {
					let uuid = res.services[i].uuid
					if (uuid.indexOf("FFF0") == 0) {
						this.getBLEDeviceCharacteristics(device, uuid)
					}
				}
			},
		})
	},
	// 获取设备特征值
	getBLEDeviceCharacteristics(device, serviceID) {
		uni.getBLEDeviceCharacteristics({
			deviceId: device.deviceId,
			serviceId: serviceID,
			success: res => {
				for (let i = 0; i < res.characteristics.length; i++) {
					let item = res.characteristics[i]
					// 该特征值是否支持 write 操作
					if (item.properties.write) {
						if (item.uuid.indexOf("FFF1") == 0) {
							writeData = {
								device: device,
								serviceID: serviceID,
								characteristicID: item.uuid
							}
							bleControl.connectStateListen(BLUE_STATE.WRITEREADY);
						}
					}
					// 该特征值是否支持 notify或indicate 操作
					if (item.properties.notify || item.properties.indicate) {
						if (item.uuid.indexOf("FFF4") == 0) {
							this.notifyBLECharacteristicValueChange(device, serviceID, item.uuid);
						}
					}
				}
			}
		})
	},
	// 监听特征值变化（设备数据变化）
	notifyBLECharacteristicValueChange(device, serviceID, characteristicID) {
		uni.notifyBLECharacteristicValueChange({
			deviceId: device.deviceId,
			serviceId: serviceID,
			characteristicId: characteristicID,
			state: true,
			success: res => {
				this.onBLECharacteristicValueChange()
			},
		})
	},


	onBLECharacteristicValueChange() {
		uni.onBLECharacteristicValueChange(res => {
			let value = this.ab2hex(res.value)
			this.resolvingData(value)
		})
	},

	// 发送指令给设备
	sendOrder(byteArray) {
		let checksum = 0x00
		// byteArray = [FD, 03, 00, 01, 00]
		// 计算异或和
		for (let i = 0; i < byteArray.length - 1; i++) {
			checksum ^= `0x${byteArray[i]}`
		}
		this.deviceMode = mode
		let sumStr = checksum.toString(16).toLocaleUpperCase()
		let hex = byteArray.join('') + sumStr // FD03000100C4

		let typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function(h) {
			return parseInt(h, 16)
		}))

		let order = typedArray.buffer

		if (!writeData.device.deviceId) {
			this.stop()
			return
		}

		this.writeBLECharacteristicValue(order, writeData.device, writeData.serviceID, writeData.characteristicID)
	},
	// 写入特征值
	writeBLECharacteristicValue(order, device, serviceID, characteristicID) {
		uni.writeBLECharacteristicValue({
			deviceId: device.deviceId,
			serviceId: serviceID,
			characteristicId: characteristicID,
			value: order,
			success: (res) => {
				console.log("特征值写入成功 --", res)
				bleControl.writeStateListen({
					code: res.errCode === 0 ? 200 : -1,
				})
			},
			fail: (res) => {
				console.log("特征值写入失败 --", res)
				bleControl.writeStateListen({
					code: -1,
				})
			}
		})
	},

	// ArrayBuffer转16进制字符串
	ab2hex(buffer, split = '') {
		var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
			return ('00' + bit.toString(16)).slice(-2)
		})
		return hexArr.join(split)
	},

	// TODO 根据自己实际业务解析数据
	resolvingData(res) {
		if (this._lastLockData == res) return
		this._lastLockData = res

		const valArr = []
		if (res.length >= 20) {
			for (let i = 0, len = 10; i < len; i++) {
				valArr[i] = res.substr(i * 2, 2)
			}
			// console.log(valArr);
		}
	},
}