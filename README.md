 是否构建生成 map file 映射表文件
 18以后严格模式会导致 useEffect 执行两次
- React 最初专注于 View
- Model 问题依赖第三方，比如：Mobx，Redux，Saga，DVA，等
- React 16 更加侧重函数式组件并引入hooks，一切皆是组件
- 通过 createContext 和 [X]Context.provider 创建 context 注入组件
- context 注入组件包裹 整个 App 根组件
- useContext hook 配合 [X]Context 可以关联到 context
- 结构函数可以提取 context 中的 model 和 function

- useCallback 不希望函数每次都被计算，保存一个函数，如果需要函数重新计算，那就在useCallback后面传入[]对应的变量
- useMemo 是保存一个变量，不希望重复计算，并返回一个值
- 
- import异步加载文件  import("./data").then((module)=>{setText(module.data)}) 

-  const LazyCompont = React.lazy(()=>import("./XXX"))
-  <React.Suspense fallback={} > </React.Suspense>
-  
-  
-  
-  
-  const refReq =React.useRef<any>();
-  onClick=()>{
	if(!!refReq.current) refReq.current.abort();
	refReq.current= new AbortController()
	
	接口后面添加  {signal:refReq.current.signal}
}
 
 
 
<!--



 import {useForm} from "react-hook-form"
 const {register,handleSubmit,watch,setError, formState:{errors}} = useForm({
	//加这参数是确定在什么情况下校验 ,onBlur 光标移开
	mode:"onBlur",
	reValidateMode:"onChange"
 });
 const [name,age] = watch(['name','age']);
 React.useEffect(()=>{
	    if(!!name && !!age && (name !==age)){
			setError('age',{type:"custom",message:"年龄和名字不一致"})
		}
 },[name,age])
 const onSubmit = ()=>{
	 
 }
 <form onSubmit={handleSubmit(onSubmit)}>
 <input {...register('name',{required:"定制的错误信息"})} />
 <input {...register('age',{required:true})} />
  {!!errors.name&&errors.name?.message.toString()||''}
  -->
 [React Hook用法详解](https://www.jianshu.com/p/f423b1401020)