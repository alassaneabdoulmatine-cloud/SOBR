import { Button } from '~/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '~/lib/auth-client';
import { useMutation } from '@tanstack/react-query';
import { toast } from '../ui/toast';
import { Spinner } from '../ui/spinner';
import { Link } from 'react-router';
import { useState } from 'react';
import { loginFormSchema, type LoginFormType } from '@repo/validation';

export function LoginForm() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    mutateAsync: loginMutateAsync,
    isPending: loginIsPending,
    error: loginError,
  } = useMutation({
    mutationFn: async ({ email, password }: LoginFormType) => {
      const result = await signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result;
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      await loginMutateAsync(data);
      setIsRedirecting(true);

      toast.add({
        type: 'success',
        description: 'You have been logged in successfully.',
      });
    } catch (error: any) {
      setIsRedirecting(false);
    }
  };

  const handleGoogleLogin = async () => {
    const data = await signIn.social({
      provider: 'google',
      callbackURL: 'http://localhost:5173/dashboard',
    });

    if (data.error) {
      toast.add({
        type: 'error',
        description: data.error.message,
      });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>

          <p className="text-sm text-balance text-muted-foreground">Enter your email below to login to your account</p>
        </div>

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input {...field} id="email" type="email" placeholder="m@example.com" aria-invalid={fieldState.invalid} />

              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Link
                  to="/forgot-password"
                  className="ml-auto text-sm underline-offset-4 hover:underline cursor-pointer"
                >
                  Forgot your password?
                </Link>
              </div>

              <Input {...field} id="password" type="password" aria-invalid={fieldState.invalid} />

              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />

        <Field>
          <Button type="submit" className="cursor-pointer" disabled={loginIsPending || isRedirecting}>
            {(loginIsPending || isRedirecting) && <Spinner />}
            Login
          </Button>

          {loginError && <FieldError className="text-center">{loginError.message}</FieldError>}
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button
            variant="outline"
            type="button"
            disabled={loginIsPending || isRedirecting}
            onClick={handleGoogleLogin}
            className="cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>

          <FieldDescription className="text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="underline underline-offset-4 cursor-pointer">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
