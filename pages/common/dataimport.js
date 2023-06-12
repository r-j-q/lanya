export const BleController = {
	/**
	 * 蓝牙连接状态
	 */
	addConnectStateListen(callBack) {
		this.public.bleConnectStateCallBack = callBack
	},
	/**
	 * 传输数据监听
	 */
	addTransferDataListen(callBack) {
		this.public.bleProgressDataCallBack = callBack
	},
	/**
	 * 数据传输完成监听
	 */
	addLockDataListen(callBack) {
		this.public.bleLockDataCallBack = callBack
	},
	/**
	 * 写入特征值状态
	 */
	addWriteStateListen(callBack) {
		this.public.bleWriteStateCallBack = callBack
	},
	// 连接状态
	connectStateListen(params) {
		if (this.public.bleConnectStateCallBack) {
			this.public.bleConnectStateCallBack(params)
		}
	},
	// 数据传输中
	transferDataListen(params) {
		if (this.public.bleTransferDataCallBack) {
			this.public.bleTransferDataCallBack(params)
		}
	},
	// 测量完成
	lockDataListen(params) {
		if (this.public.bleLockDataCallBack) {
			this.public.bleLockDataCallBack(params)
		}
	},
	// 写入特征值状态
	writeStateListen(params) {
		if (this.public.bleWriteStateCallBack) {
			this.public.bleWriteStateCallBack(params)
		}
	},

	public: {
		bleConnectStateCallBack: null,
		bleTransferDataCallBack: null,
		bleLockDataCallBack: null,
		bleWriteStateCallBack: null,
	}
}
