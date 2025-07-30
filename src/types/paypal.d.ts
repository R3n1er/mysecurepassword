declare module "@paypal/paypal-server-sdk" {
  export const core: {
    SandboxEnvironment: new (clientId: string, clientSecret: string) => unknown;
    LiveEnvironment: new (clientId: string, clientSecret: string) => unknown;
    PayPalHttpClient: new (environment: unknown) => unknown;
  };

  export const orders: {
    OrdersCreateRequest: new () => unknown;
    OrdersCaptureRequest: new (orderId: string) => unknown;
    OrdersGetRequest: new (orderId: string) => unknown;
  };

  export const payments: {
    CapturesRefundRequest: new (captureId: string) => unknown;
  };
}
