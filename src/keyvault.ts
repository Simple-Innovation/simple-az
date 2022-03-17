// node-forge appears to still be a CommonJS module which causes issues when used from a calling ESM Module
// This syntax resolves them
import pkg from "node-forge";

import {
  DefaultAzureCredential,
  ManagedIdentityCredential,
} from "@azure/identity";
import {
  CertificateClient,
  KeyVaultCertificate,
} from "@azure/keyvault-certificates";
import { KeyVaultSecret, SecretClient } from "@azure/keyvault-secrets";
import { asn1, pki, util } from "node-forge";

export async function getCertificateThumbprint(
  credential: ManagedIdentityCredential | DefaultAzureCredential,
  vaultUrl: string,
  certificateName: string
): Promise<string> {
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

export async function getCertificatePrivateKey(
  credential: ManagedIdentityCredential | DefaultAzureCredential,
  vaultUrl: string,
  certificateName: string
): Promise<string> {
  // The certificate's private key is held as a secret in the keyvault with the same name as the credential
  const secretClient: SecretClient = new SecretClient(vaultUrl, credential);

  const keyVaultSecret: KeyVaultSecret = await secretClient.getSecret(
    certificateName
  );

  const privateKey = getPrivateKeyFromBase64DER(keyVaultSecret.value);

  return privateKey;
}

function getPrivateKeyFromBase64DER(base64der: string) {
  const der = util.decode64(base64der);
  const asn1String = asn1.fromDer(der);
  const pkcs12Pfx: pkg.pkcs12.Pkcs12Pfx = pkg.pkcs12.pkcs12FromAsn1(asn1String);
  const keyBagCollection = pkcs12Pfx.getBags({
    bagType: pki.oids.pkcs8ShroudedKeyBag,
  });
  const pkcs8ShroudedKeyBag = keyBagCollection[pki.oids.pkcs8ShroudedKeyBag][0];
  const rsaPrivateKey = pki.privateKeyToAsn1(pkcs8ShroudedKeyBag.key);
  const privateKeyInfo = pki.wrapRsaPrivateKey(rsaPrivateKey);
  const pemCertificate = pki.privateKeyInfoToPem(privateKeyInfo);
  return pemCertificate;
}
