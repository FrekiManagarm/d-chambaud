type PricingFormErrorProps = {
  error?: string;
};

export function PricingFormError({ error }: PricingFormErrorProps) {
  return error ? (
    <p className="bo-form-error" role="alert">
      {error}
    </p>
  ) : null;
}
