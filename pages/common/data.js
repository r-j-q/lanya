export const BLUE_STATE = {
	/**
	 * 蓝牙不可用
	 */
	UNAVAILABLE: {
		label: '请检查手机蓝牙是否开启',
		code: -1
	},
	/**
	 * 等待连接蓝牙
	 */
	READY: {
		label: '等待连接蓝牙',
		code: 10000
	},
	/**
	 * 等待连接蓝牙(重启蓝牙适配器)
	 */
	READYAGAIN: {
		label: '等待连接蓝牙',
		code: 10001
	},
	/**
	 * 正在搜索设备...
	 */
	SCANING: {
		label: '正在搜索设备...',
		code: 12000
	},
	/**
	 * 正在传输数据...
	 */
	TRANSMITDATA: {
		label: '正在传输数据...',
		code: 13000
	},
	/**
	 * 数据传输完成
	 */
	LOCKDATA: {
		label: '数据已锁定',
		code: 11000
	},
	/**
	 * 已连接蓝牙
	 */
	CONNECTSUCCESS: {
		label: '已连接蓝牙',
		code: 200
	},
	/**
	 * 写入特征已准备就绪
	 */
	WRITEREADY: {
		label: '写入特征已准备就绪',
		code: 201
	},
	/**
	 * 蓝牙连接已断开
	 */
	DISCONNECT: {
		label: '蓝牙连接已断开',
		code: 500
	},
	/**
	 * 连接失败, 请重试！
	 */
	CONNECTFAILED: {
		label: '连接失败, 请重试！',
		code: -2
	},
	/**
	 * 微信无位置权限
	 */
	NOLOCATIONPERMISSION: {
		label: '您关闭了微信位置权限，请前往手机设置页打开权限后重试',
		code: 10007
	},
	/**
	 * 当前系统版本过低，请升级后重试！
	 */
	VERSIONLOW: {
		label: '当前系统版本过低，请升级后重试！',
		code: 10009
	},
	/**
	 * 系统异常，请稍后重试！
	 */
	SYSTEMERROR: {
		label: '系统异常，请稍后重试！',
		code: 10008
	}
}
