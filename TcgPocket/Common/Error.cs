using AutoMapper;
using ValidationFailure = FluentValidation.Results.ValidationFailure;

namespace TcgPocket.Common;

public class Error
{
    public string Property { get; set; }
    public string Message { get; set; }

    public static Response AsResponse(string message, string property = "")
    {
        return new Response {Errors = new List<Error> {new() {Property = property, Message = message}}};
    }

    public static Response<T> AsResponse<T>(string message, string property = "") 
    {
        return new Response<T> {Errors = new List<Error> {new() {Property = property, Message = message}}};
    }
}

public class ErrorMapper : Profile
{
    public ErrorMapper()
    {
        CreateMap<ValidationFailure, Error>()
            .ForMember(dest => dest.Property, opts => opts.MapFrom(src => src.PropertyName))
            .ForMember(dest => dest.Message, opts => opts.MapFrom(src => src.ErrorMessage));
    }
}