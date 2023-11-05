interface Props {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-grow justify-center items-center">
      <div className="bg-slate-200 rounded-md space-x-8 p-10">
        {children}
      </div>
    </div>
  )
}
export default AuthLayout 
