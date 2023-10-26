namespace TcgPocket.Shared;

public abstract class AppSettings
{
    public const string DefaultConnection = nameof(DefaultConnection);
    public const string PythonEnvName = nameof(PythonEnvName);
}

public abstract class OrderBy
{
    public const string Ascending = "asc";
    public const string Descending = "desc";
}

public abstract class Roles
{
    public const string Basic = nameof(Basic);
    public const string Admin = nameof(Admin);
}
