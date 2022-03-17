import {
  DefaultAzureCredential,
  ManagedIdentityCredential,
} from "@azure/identity";
import {
  CertificateClient,
  KeyVaultCertificate,
} from "@azure/keyvault-certificates";

export async function getThumbprint(
  credential: ManagedIdentityCredential | DefaultAzureCredential,
  vaultUrl: string,
  certificateName: string
) {
  const certificateClient: CertificateClient = new CertificateClient(
    vaultUrl,
    credential
  );
  const keyVaultCertificate: KeyVaultCertificate =
    await certificateClient.getCertificate(certificateName);
  const thumbprint: string = Buffer.from(
    keyVaultCertificate.properties.x509Thumbprint
  ).toString("hex");
  return thumbprint;
}
