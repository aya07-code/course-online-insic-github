<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Middleware\RoleMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        // web: __DIR__.'/../routes/web.php',
        // commands: __DIR__.'/../routes/console.php',
        // health: '/up',
        commands: __DIR__.'/../routes/console.php',
        using: function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));
    
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->prependToGroup('web', EnsureFrontendRequestsAreStateful::class);
         $middleware->alias([
            'role' => RoleMiddleware::class,
        ]);
    })
    // ->withRouting(
    //     api: __DIR__.'/../routes/api.php',
    //     apiPrefix: '/api',
    //     // ...
    // )
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
