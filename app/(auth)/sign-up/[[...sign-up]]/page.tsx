import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-background shadow-xl",
            headerTitle: "text-2xl font-bold",
            headerSubtitle: "text-muted-foreground",
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            footerActionLink: "text-primary hover:text-primary/90",
            formFieldInput: "bg-background border-input",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground",
            socialButtonsIconButton: "border-input hover:bg-accent",
            socialButtonsBlockButton: "border-input hover:bg-accent",
            formFieldLabel: "text-foreground",
            identityPreviewText: "text-muted-foreground",
            identityPreviewEditButtonIcon: "text-muted-foreground",
          },
        }}
        redirectUrl="/onboarding"
        signInUrl="/sign-in"
      />
    </div>
  )
}