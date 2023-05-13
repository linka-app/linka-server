<?php

    namespace App\Console\Commands;

    use App\Models\User;
    use Illuminate\Console\Command;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Validation\ValidationException;

    class CreateUser extends Command
    {
        /**
         * The name and signature of the console command.
         *
         * @var string
         */
        protected $signature = 'user:create';

        /**
         * The console command description.
         *
         * @var string
         */
        protected $description = 'Create a new user';

        /**
         * Execute the console command.
         *
         * @return int
         */
        public function handle(User $user): int
        {
            $name = $this->ask('What is your name?');
            $email = $this->ask('What is your email?');
            $password = $this->secret('What is the password?');

            try {
                $user->create([
                                  'name'     => $name,
                                  'email'    => $email,
                                  'password' => Hash::make($password)
                              ]);
            } catch (ValidationException $exception) {
                $this->error($exception->getMessage());

                return Command::FAILURE;
            }

            $this->info('The user was created!');

            return Command::SUCCESS;
        }
    }
