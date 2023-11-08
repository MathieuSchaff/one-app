"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import GoogleSignInButton from "../GoogleSignInButton"
import { signIn } from "next-auth/react"
import { useToast } from "../ui/use-toast"
const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }).email().max(20, {
    message: "email must be at most 20 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
})
export const SignInForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorLogin, setErrorLogin] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', { // 'credentials' is the name of the provider
        redirect: false, // This will prevent the page from being redirected
        email: values.email,
        password: values.password,
        // callbackUrl: "/"
      })
      console.log(result)
      if (result?.error) {
        console.log('Error signing in: ', result.error)

        setErrorLogin(true)
        throw new Error('Error signing in: ' + result.error)
      }
      router.refresh()
      router.push('/documents')
    } catch (error) {
      console.log('Error signing in: ', error)
      setErrorLogin(true)
      toast({
        title: "Error signing in",
        description: "Something went wrong! Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }

  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full text-secondary">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-md text-primary">Email</FormLabel>
                <FormControl>

                  <Input placeholder="my-email@email.com" type="email" className=" font-bold mt-1 block w-full py-2 px-3 bg-white text-primary border-primary border-2  rounded-md focus:bg-primary shadow-sm focus:text-white sm:text-sm outline-0 focus-visible:ring-offset-0 focus-visible:ring-0"

                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-md text-primary">Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" className=" font-bold mt-1 block w-full py-2 px-3 bg-white text-primary border-primary border-2  rounded-md focus:bg-primary shadow-sm focus:text-white sm:text-sm outline-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-secondary bg-primary mt-8 text-white hover:text-primary hover:bg-white hover:border-2 hover:border-primary">

            {isLoading ? [<Loader2 className="w-6 h-6 animate-spin mr-4" key={"loadingIcon"} />, "Please wait"] : "Sign in"}
          </Button>
          <div className="text-black mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </div>
          <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
          <p className="text-center text-sm text-black mt-2">
            If you don&apos;t have an account,{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
      {errorLogin && <div className="text-red-500 mt-4">Email or password is incorrect</div>}
    </div>
  )

}
