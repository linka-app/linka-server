<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookmarks', function (Blueprint $table) {
            $table->id();
            $table->text('url')->nullable();
            $table->text('title');
            $table->text('description')->nullable();
            $table->string('website_title', 255)->nullable();
            $table->text('website_description')->nullable();
            $table->boolean('unread')->default(false);
            $table->boolean('archived')->default(false);
            $table->boolean('shared')->default(false);
            $table->timestamp('accessed_at')->nullable();
            $table->text('web_archive_snapshot_url')->nullable();
            $table->string('favicon_file', 255)->nullable();
            $table->foreignIdFor(\App\Models\User::class)->constrained()->cascadeOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookmarks');
    }
};
