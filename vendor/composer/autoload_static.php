<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInita800452a268c6f87c7086c8601db0b32
{
    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInita800452a268c6f87c7086c8601db0b32::$classMap;

        }, null, ClassLoader::class);
    }
}
