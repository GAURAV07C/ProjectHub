"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewPasswordSchema } from "@/schemas/AuthSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Suspense, useState, useTransition } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSucess from "@/components/form-sucess";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordFormContent />
    </Suspense>
  );
};

const NewPasswordFormContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",

      confirm_password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSucess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSucess(data?.sucess);
      });
    });
  };

  return (
    <div>
      <CardWrapper
        headerLabel="Enter a password "
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        // showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="***"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="***"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSucess message={sucess} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Reset password
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default NewPasswordForm;
