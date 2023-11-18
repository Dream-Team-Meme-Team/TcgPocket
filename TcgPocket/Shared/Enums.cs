namespace TcgPocket.Shared;

public abstract class AppSettings
{
    public const string DefaultConnection = nameof(DefaultConnection);

    public abstract class PythonSettings
    {
        public const string Executable = "PythonSettings:Executable";
        public const string MachineLearningModel = "PythonSettings:MachineLearningModel";
    }

    public abstract class BlobSettings
    {
        public const string ConnectionString = "BlobSettings:ConnectionString";
        public const string ContainerName = "BlobSettings:ContainerName";
    }
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

public abstract class GameNames
{
    public const string Magic = nameof(Magic);
    public const string Yugioh = "Yu-Gi-Oh";
    public const string Pokemon = "Pokémon";
}