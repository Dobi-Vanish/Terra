using Microsoft.AspNetCore.StaticFiles;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Настройка обслуживания статических файлов
var staticFileOptions = new StaticFileOptions
{
    ContentTypeProvider = new FileExtensionContentTypeProvider()
};

app.UseStaticFiles(staticFileOptions);

// API endpoint
app.MapGet("/api/health", () =>
    new { status = "ok", message = "Server is running" });

// Fallback для SPA
app.MapFallback(async context =>
{
    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "../../web",
                               context.Request.Path.Value?.TrimStart('/') ?? "index.html");
    if (File.Exists(filePath))
    {
        await context.Response.SendFileAsync(filePath);
    }
    else
    {
        context.Response.StatusCode = 404;
        await context.Response.WriteAsync("Not Found");
    }
});

Console.WriteLine("Сервер запущен на http://localhost:8080");
Console.WriteLine("Статические файлы обслуживаются из папки web/");
Console.WriteLine("Доступные страницы:");
Console.WriteLine("  http://localhost:8080 - Главная");
Console.WriteLine("  http://localhost:8080/races.html - Расы");
Console.WriteLine("  http://localhost:8080/classes.html - Классы");
Console.WriteLine("  http://localhost:8080/religions.html - Религии");
Console.WriteLine("  http://localhost:8080/applications.html - Анкеты");
Console.WriteLine("  http://localhost:8080/mechanics.html - Механики");
Console.WriteLine("  http://localhost:8080/abilities.html - Способности");

app.Run("http://localhost:8080");