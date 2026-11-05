'use client';

import { useStoreText } from "@/components/shared/store-language-provider";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signInWihCredentials } from '@/lib/actions/user.action';
import { useSearchParams } from 'next/navigation';

const CredentialsSignInForm = () => {
  const t = useStoreText();
  const [data, action] = useActionState(signInWihCredentials, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className='h-12 w-full' variant='default'>
        {pending ? t("Connexion en cours…", "Signing in…") : t("Se connecter", "Sign in")}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='email'>{t("Adresse e-mail", "Email address")}</Label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            defaultValue={""}
          />
        </div>
        <div>
          <Label htmlFor='password'>{t("Mot de passe", "Password")}</Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='current-password'
            defaultValue={""}
          />
        </div>
        <div>
          <SignInButton />
        </div>

        {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}

        <div className='text-sm text-center text-muted-foreground'>
          {t("Vous n’avez pas de compte ?", "Don’t have an account?")}{' '}
          <Link href='/sign-up' target='_self' className='text-link text-foreground' >
           {t("Inscrivez-vous", "Sign up")}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
