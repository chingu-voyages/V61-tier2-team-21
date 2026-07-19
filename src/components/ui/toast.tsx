import { Toaster as Sonner, type ToasterProps } from "sonner";
import { TOAST_DURATION_MS } from "@/data/constants";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--accent-secondary)",
          "--normal-text": "var(--color-light-primary)",
          "--normal-border": "var(--color-light-primary)",
          "--border-radius": "25px",
        } as React.CSSProperties
      }
      toastOptions={{
        duration: TOAST_DURATION_MS,
        classNames: {
          toast:
            "flex-col items-center justify-center rounded-[25px] border border-light-primary bg-accent-secondary px-10 py-[45px]",
          title: "text-center sm:text-sm md:text-lg lg:text-xl leading-6 ",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
