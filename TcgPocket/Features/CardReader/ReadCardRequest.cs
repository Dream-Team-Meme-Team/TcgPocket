using System.Diagnostics;
using MediatR;
using Newtonsoft.Json.Linq;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardReader;

public class ReadCardRequest : IRequest<Response<string?>>
{
    public IFormFile Image { get; set; }
}

public class ReadCardRequestHandler : IRequestHandler<ReadCardRequest, Response<string?>>
{
    public async Task<Response<string?>> Handle(ReadCardRequest request, CancellationToken cancellationToken)
    {
        using var stream = new MemoryStream();
        await request.Image.CopyToAsync(stream, cancellationToken);

        var imageBytes = stream.ToArray();
        // var streamArg = Convert.ToBase64String(stream.ToArray());
        var processStartInfo = new ProcessStartInfo
        {
            FileName = "python.exe",
            // Arguments = $"datamodel.py {streamArg}",
            Arguments = "datamodel.py",
            RedirectStandardOutput = true,
            RedirectStandardInput = true,
            UseShellExecute = false,
            CreateNoWindow = true,
        };

        using var process = new Process();
        process.StartInfo = processStartInfo;
        process.Start();

        // await using var writeStream = process.StandardInput.BaseStream;
        var chunkSize = 4096;
        for (var i = 0; i < imageBytes.Length; i += chunkSize)
        {
            var remaining = Math.Min(chunkSize, imageBytes.Length - i);
            // var output = imageBytes.Skip(i).Take(remaining).ToString();
            // process.StandardInput.Write(output);
            process.StandardInput.BaseStream.Write(imageBytes, i, remaining);
        }
        // process.StandardInput.WriteLine();
        
        // process.StandardInput.BaseStream.Write(imageBytes, 0, imageBytes.Length);
        process.StandardInput.Close();
        
        process.WaitForExit();

        var result = await process.StandardOutput.ReadToEndAsync(cancellationToken);

        // return JObject.Parse(result).AsResponse();
        return  result?.AsResponse();
    }
}
