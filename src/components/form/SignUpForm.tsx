"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import GoogleSignInButton from "../GoogleSignInButton"
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
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"
const formSchema = z.object({
  username: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }).max(20, {
    message: "username must be at most 20 characters.",
  }),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }).email().max(20, {
    message: "email must be at most 20 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
  confirmPassword: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
export const SignUpForm = () => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
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

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      if (response.ok) {
        router.push('/sign-in')
      } else {
        throw new Error('Something went wrong!')
      }

    } catch (err: unknown) {
      console.log(err)
      if (err instanceof Error) {
        toast({
          title: "Error signing in",
          description: err.message,
          variant: "destructive"
        })
      } else {
        toast({
          title: "Error signing in",
          description: "Something went wrong! Please try again.",
          variant: "destructive"
        })
      }
    } finally {
      setIsLoading(false)
    }


  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full text-secondary">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-md text-primary">Username</FormLabel>
              <FormControl>

                <Input placeholder="my-email@email.com" type="text" className=" font-bold mt-1 block w-full py-2 px-3 bg-white text-primary border-primary border-2  rounded-md focus:bg-primary shadow-sm focus:text-white sm:text-sm outline-0 focus-visible:ring-offset-0 focus-visible:ring-0"

                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-md text-primary">Confirm password</FormLabel>
              <FormControl>
                <Input placeholder=" confirm password" type="password" className=" font-bold mt-1 block w-full py-2 px-3 bg-white text-primary border-primary border-2  rounded-md focus:bg-primary shadow-sm focus:text-white sm:text-sm outline-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <Button type="submit" className="w-full text-secondary bg-primary mt-8 text-white hover:text-primary hover:bg-white hover:border-2 hover:border-primary">Sign Up</Button>
        <div className="text-black mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
        <p className="text-center text-sm text-black mt-2">
          If you already have an account,{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  )

}
