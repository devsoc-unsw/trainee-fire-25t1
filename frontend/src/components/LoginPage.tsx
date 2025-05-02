import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import logo from '../assets/jukeboxd.svg'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white rounded-lg p-8 w-full max-w-sm shadow-md">
        <div className="flex justify-center mb-4">
          <img src={logo} className="logo" alt="Jukeboxd logo" />
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="username" className="pb-1">Username</Label>
            <Input id="username" placeholder="Username" />
          </div>

          <div>
            <Label htmlFor="password" className="pb-1">Password</Label>
            <Input id="password" type="password" placeholder="Password" />
          </div>

          <Button
            variant="default"
            className="w-full !bg-green-600 !text-white hover:!bg-green-700"
          >
            Sign In
          </Button>


          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <a href="#" className="underline font-medium">
              Register.
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
