# simple-az

Interact with Azure via TypeScript and Node, with Jest testing.

# Build



# Test

- Create a [.env](.env) file

```.env
AZURE_CLIENT_ID="Azure AD App Registration ID with Certificate Read Access on the Keyvault"
AZURE_CLIENT_SECRET="A secret for the Azure AD App Registration"
AZURE_TENANT_ID="The Azure Tenant ID the Azure Keyvault resides in"
AZURE_KEYVAULT_URL="The URL to the Azure Keyvault, e.g. https://my-keyvault.vault.azure.net/"
AZURE_KEYVAULT_CERTIFICATE_NAME="The name of a certificate in the Azure Keyvault"
AZURE_KEYVAULT_THUMBPRINT="The thumbprint of a certificate in the Azure Keyvault"
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
