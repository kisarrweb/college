import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function LoginPage() {
    return (
        <main className="h-dvh flex flex-col items-center gap-6 text-4xl p-4 mt-20">
            <h1>CEM Ahoune Sané</h1>
            <Image
                className="m-0 rounded-xl"
                src="/images/cemas.jpg"
                width={300}
                height={300}
                sizes="300px"
                alt="logo"
                priority={true}
                title="Logo CEMAS"
            />
            <Button asChild>
                <LoginLink>Sign In</LoginLink>
            </Button>
        </main>
    )
}