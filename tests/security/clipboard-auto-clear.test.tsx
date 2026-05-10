import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import PasswordGeneratorV2 from "@/components/password/PasswordGeneratorV2";
import { useIsClient } from "@/hooks/useIsClient";

vi.mock("@/hooks/useIsClient", () => ({
  useIsClient: vi.fn(() => true),
}));

vi.mock("@/components/animations/Confetti", () => ({
  default: () => null,
}));

describe("cycle de vie sécurisé du mot de passe copié", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    (useIsClient as unknown as ReturnType<typeof vi.fn>).mockReturnValue(true);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("efface le champ et le presse-papiers 30 secondes après copie", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    render(<PasswordGeneratorV2 />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /générer/i }));
      await vi.advanceTimersByTimeAsync(500);
    });

    const input = screen.getByLabelText("Mot de passe généré");
    expect((input as HTMLInputElement).value).toMatch(/^.{14}$/);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /copier le mot de passe/i }));
      await Promise.resolve();
    });

    expect(writeText).toHaveBeenCalledTimes(1);
    const copiedPassword = writeText.mock.calls[0][0];
    expect(copiedPassword).toHaveLength(14);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(29_000);
    });
    expect(input).toHaveValue(copiedPassword);
    expect(writeText).toHaveBeenCalledTimes(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_000);
    });
    expect(input).toHaveValue("");
    expect(writeText).toHaveBeenLastCalledWith("");
  });
});
