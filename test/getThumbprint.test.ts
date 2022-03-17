import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { getThumbprint } from "../src/getThumbprint";

it("Gets a thumbprint", async () => {
  expect(
    await getThumbprint(
      new DefaultAzureCredential(),
      process.env.AZURE_KEYVAULT_URL,
      process.env.AZURE_KEYVAULT_CERTIFICATE_NAME
    )
  ).toBeDefined();
});
