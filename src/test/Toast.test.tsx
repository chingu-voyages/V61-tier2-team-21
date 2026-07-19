import { describe, it, expect } from "vite-plus/test";
import { render, screen, fireEvent } from "@testing-library/react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toast";

function ToastTrigger() {
  return (
    <>
      <Toaster />
      <button onClick={() => toast("Invalid")}>Show toast</button>
    </>
  );
}

describe("Toaster", () => {
  it("renders a toast message when triggered", async () => {
    render(<ToastTrigger />);

    fireEvent.click(screen.getByRole("button", { name: /show toast/i }));

    expect(await screen.findByText("Invalid")).toBeInTheDocument();
  });
});
