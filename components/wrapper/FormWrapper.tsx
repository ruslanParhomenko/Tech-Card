import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import SaveExitButton from "../buttons/SaveExitButton";

export function FormWrapper({
  form,
  children,
  onSubmit,
  className,
  resetForm,
  ...props
}: {
  form: UseFormReturn<any>;
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  className?: string;
  resetForm?: () => void;
  [key: string]: any;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit || (() => {}))} {...props}>
        <div className={cn(className, "flex flex-col w-full py-8 px-4 ")}>
          {children}
          <SaveExitButton resetForm={resetForm} />
        </div>
      </form>
    </Form>
  );
}
