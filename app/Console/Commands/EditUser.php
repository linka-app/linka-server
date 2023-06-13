<?php

    namespace App\Console\Commands;

    use App\Models\User;
    use Illuminate\Console\Command;
    use Illuminate\Support\Facades\Hash;

    class EditUser extends Command
    {
        /**
         * The name and signature of the console command.
         *
         * @var string
         */
        protected $signature = 'user:edit';

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
        public function handle(): int
        {
            $user = $this->ask('What is the User ID?');
            $password = $this->secret('What is the password?');

            try {
                $user = User::findOrFail($user);
                $user['password'] = Hash::make($password);
                $user->save();
            } catch (\Exception $exception) {
                $this->error($exception->getMessage());

                return Command::FAILURE;
            }

            $this->info('The password was edited!');

            return Command::SUCCESS;
        }
    }
