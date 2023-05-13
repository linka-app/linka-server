<?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration {
        /**
         * Run the migrations.
         */
        public function up(): void
        {
            Schema::create('user_profiles', function (Blueprint $table) {
                $table->id();
                $table->foreignIdFor(\App\Models\User::class)->constrained()->cascadeOnDelete();
                $table->enum('bookmark_date_display', [
                    'relative',
                    'absolute',
                    'hidden'
                ])->default('relative');
                $table->enum('bookmark_link_target', [
                    '_blank',
                    '_self'
                ])->default('_blank');
                $table->boolean('enable_sharing')->default(FALSE);
                $table->boolean('enable_favicons')->default(TRUE);
                $table->boolean('slugify tags')->default(TRUE);
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('user_profiles');
        }
    };
