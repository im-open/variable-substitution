# variable-substitution

This Action is a copy of the deprecated [microsoft/variable-substitution] which has been updated to run on Node 16.

## GitHub Action for substituting variables in parameterized files

With the variable-substitution Action for GitHub, you can apply variable substitution to XML, JSON and YAML based configuration and parameter files.

- Tokens defined in the target configuration files are updated and then replaced with variable values.
- Variable substitution is applied for only the JSON keys predefined in the object hierarchy. It does not create new keys.
- Only variables defined explicitly as Environment variables as part of the workflow or system variables that are already available for workflow context can be used in substitution.
- Variable substitution takes effect only on the `applicationSettings`, `appSettings`, `connectionStrings` and `configSections` elements of configuration files. Please refer [this](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/transforms-variable-substitution?view=azure-devops&tabs=Classic#xml-variable-substitution) for more information.

The definition of this Github Action is in [action.yml](https://github.com/im-open/variable-substitution/blob/master/action.yml).

## Inputs

| Parameter | Is Required | Description                                                                                                                                   |
|-----------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `files`   | true        | Comma separated list of XML/JSON/YAML files in which tokens are to be substituted. <br/><br/>Files names must be specified relative to the folder-path. |

## Outputs

This action does not have outputs.

### Usage Example

See [Use variable substitution with GitHub Actions](https://docs.microsoft.com/en-us/azure/developer/github/github-variable-substitution) for additional examples of how to use variable substitution.

#### Configuration file before substitution

```json
{
  "IsProduction": false,
  "ClientId": 123456,
  "ConnectionStrings": {
    "MyApp": "Server=localhost;Database=MyDB;Trusted_Connection=True"
  }
}
```

#### Workflow that uses the action

```yaml
on: [pull_request]
name: CI Build

jobs:
  run-integration-tests:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Update sql connection string in test project
      uses: microsoft/variable-substitution@v1
      with:
        files: './src/MyApp.Tests/appsettings.json'
      env:
        # Substitutions are case sensitive and must match what is present
        # in the file with substitutions (in this case appsettings.json)
        ClientId: 098765
        ConnectionStrings.MyApp: 'Server=localhost;Database=MyDB;Trusted_Connection=False;User ID=SA;Password=Abc123!'

    - name: run integration tests
      run: dotnet test --logger trx --no-restore --configuration Release
 ```

#### Configuration file after substitution

```json
{
  "IsProduction": false,
  "ClientId": 098765,
  "ConnectionStrings": {
    "MyApp": "Server=localhost;Database=MyDB;Trusted_Connection=False;User ID=SA;Password=Abc123!"
  }
}
```

## Code of Conduct

This project has adopted the [im-open's Code of Conduct](https://github.com/im-open/.github/blob/main/CODE_OF_CONDUCT.md).

## License

Copyright &copy; 2023, Extend Health, LLC. Code released under the [MIT license](LICENSE).

[microsoft/variable-substitution]: https://github.com/microsoft/variable-substitution
