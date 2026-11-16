# BR Test Data Generators

Raycast extension that generates valid Brazilian test data.

| Command | Output |
|---|---|
| Generate CPF | Valid CPF, copied or pasted |
| Generate CNPJ | Valid head-office CNPJ (`/0001`), numeric or the 2026 alphanumeric format |
| Generate Address | Real street + CEP from [ViaCEP](https://viacep.com.br) with a random number |

Preferences: punctuation on/off, and copy vs paste into the frontmost app.

## Development

```sh
npm install
npm run dev
```
