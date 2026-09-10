import { Button } from '~/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { signupFormSchema, type SignupFormType } from '@repo/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, signUp } from '~/lib/auth-client';
import { useMutation } from '@tanstack/react-query';
import { toast } from '../ui/toast';
import { Spinner } from '../ui/spinner';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function SignupForm() {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { control, handleSubmit } = useForm<SignupFormType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const {
    mutateAsync: signupMutateAsync,
    isPending: signupIsPending,
    error: signupError,
  } = useMutation({
    mutationFn: async ({ name, email, password }: SignupFormType) => {
      const result = await signUp.email({
        name,
        email,
        password,
        callbackURL: '/workspace',
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result;
    },
  });

  const onSubmit = async (data: SignupFormType) => {
    try {
      await signupMutateAsync(data);
      setIsRedirecting(true);

      toast.add({
        type: 'success',
        description: 'You have been signed up successfully.',
      });

      navigate('/workspace');
    } catch (error: any) {
      setIsRedirecting(false);
    }
  };

  const handleGoogleSignup = async () => {
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
          <h1 className="text-2xl font-bold">Create your account</h1>

          <p className="text-sm text-balance text-muted-foreground">Fill in the form below to create your account</p>
        </div>

        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>

              <Input
                {...field}
                id="name"
                type="text"
                placeholder="John Doe"
                className="bg-background"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                {...field}
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                className="bg-background"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <Input
                {...field}
                id="password"
                type="password"
                className="bg-background"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.error ? (
                <FieldError>{fieldState.error.message}</FieldError>
              ) : (
                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
              )}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>

              <Input
                {...field}
                id="confirm-password"
                type="password"
                className="bg-background"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.error ? (
                <FieldError>{fieldState.error.message}</FieldError>
              ) : (
                <FieldDescription>Please confirm your password.</FieldDescription>
              )}
            </Field>
          )}
        />

        <Field>
          <Button type="submit" className="cursor-pointer" disabled={signupIsPending || isRedirecting}>
            {(signupIsPending || isRedirecting) && <Spinner />}
            Create Account
          </Button>

          {signupError && <FieldError className="text-center">{signupError.message}</FieldError>}
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button
            variant="outline"
            type="button"
            disabled={signupIsPending || isRedirecting}
            onClick={handleGoogleSignup}
            className="cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Sign up with Google
          </Button>

          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/login">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
