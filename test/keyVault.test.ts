import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import {
  getCertificatePrivateKey,
  getCertificateThumbprint,
} from "../src/keyvault";

describe("Certificate actions", () => {
  it("gets a certificate's Private Key", async () => {
    expect(await getCertificatePrivateKey(
      new DefaultAzureCredential(),
      process.env.AZURE_KEYVAULT_URL,
      process.env.AZURE_KEYVAULT_CERTIFICATE_NAME
    )).not.toBeNull();
  });

  it("gets a certificate's thumbprint", async () => {
    expect(
      await getCertificateThumbprint(
        new DefaultAzureCredential(),
        process.env.AZURE_KEYVAULT_URL,
        process.env.AZURE_KEYVAULT_CERTIFICATE_NAME
      )
    ).not.toBeNull();
  });
});
