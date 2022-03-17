# simple-az

Interact with Azure via TypeScript and Node, with Jest testing.

This is an ESM Module that simplifies some of the common tasks encountered when using Azure.

## Usage

The module is available from NPM.

To install it:

```npm
npm install simple-az
```

To use it:

```ts
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { getCertificatePrivateKey, getCertificateThumbprint } from "simple-az";

const thumbprint = await getCertificatePrivateKey(
  new DefaultAzureCredential(),
  process.env.AZURE_KEYVAULT_URL,
  process.env.AZURE_KEYVAULT_CERTIFICATE_NAME
);
```

## Build

Build the module by running the following commands

```sh
npm install
npm run build
```

## Test

- Create a [.env](.env) file
- Register an Azure Active Directory App Registration
  - in the .env file set 
    - AZURE_TENANT_ID to the Azure Tenant ID of the Azure Active Directory App Registration
    - AZURE_CLIENT_ID to the Azure AD App Registration ID with Certificate Read Access on the Keyvault
- Create a secret for the Azure Active Directory App Registration
  - in the .env file set 
    - AZURE_CLIENT_SECRET to the Secret of the Azure Active Directory App Registration
- Create an Azure Resource Group
- Create an Azure Key Vault in the Azure Resource Group
  - in the .env file set 
    - AZURE_KEYVAULT_URL to the URL of the Azure Keyvault
- Generate a Certificate in the Azure  
  - in the .env file set 
    - AZURE_KEYVAULT_CERTIFICATE_NAME to the Name of the Certificate in the Azure Keyvault

For example:

```env
AZURE_CLIENT_ID="Azure AD App Registration ID with Certificate Read Access on the Keyvault"
AZURE_CLIENT_SECRET="A secret for the Azure AD App Registration"
AZURE_TENANT_ID="The Azure Tenant ID of the Azure Active Directory App Registration"
AZURE_KEYVAULT_URL="The URL to the Azure Keyvault, e.g. https://my-keyvault.vault.azure.net/"
AZURE_KEYVAULT_CERTIFICATE_NAME="The name of a certificate in the Azure Keyvault"
```

- Run Jest

```sh
npm run test
```

# Publish

```sh
npm login
npm publish --access=public
```

# Contribute
