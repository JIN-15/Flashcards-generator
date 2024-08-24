
# FlashMaster

**FlashMaster** is a powerful and modern web application designed to help users create, manage, and study flashcards. Built with Next.js for both frontend and backend, this application leverages Firebase for database management and integrates the Meta-Llama/llama-3.1-8b model for intelligent flashcard generation. Whether you're a student, professional, or lifelong learner, FlashMaster provides a seamless experience for generating and managing personalized flashcards.

## [Ali Hassan](https://www.linkedin.com/in/ali-hassan-08b306226/)

## Features

- **Homepage:** A welcoming dashboard that provides an overview and access to flashcard functionalities.
- **User Authentication:** Secure sign-in and sign-up pages using Clerk components.
- **Flashcard Generation:** Users can generate flashcards based on their input, with content personalized to their user ID and stored in Firebase.
- **Flashcard Management:** Option to load and save flashcards with titles and collections. Each collection contains 10 flashcards on a specific topic.
- **Subscription Model:** Basic and Pro packages available for purchase to access different features and premium content.
- **Material UI Integration:** Modern and responsive design using Material UI components for a professional look and feel.

## Installation

To set up FlashMaster locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/JIN-15/Flashcards-generator.git
   cd flashmaster
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    OPENAI_API_KEY=your_openai_api_key
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. **Run the Application:**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` in your browser to see FlashMaster in action.

## Screenshots

Here are some screenshots of FlashMaster in action:

1. ![Homepage](/assets/home.png)
2. ![Sign In Page](/assets/signin.png)
3. ![Flashcard Creation](/assets/generate.png)
4. ![Flashcard Collection](/assets/saved.png)
5. ![Loading saved cards](/assets/load.png)

## Video Demonstration

Watch our [YouTube video](https://youtu.be/edQyPqgg4zY) to see FlashMaster in action and learn more about its features.

## Technologies Used

- **Next.js:** Full-stack framework for React applications.
- **Firebase:** Real-time database and authentication.
- **Meta-Llama/llama-3.1-8b:** For intelligent flashcard generation.
- **Material UI:** Component library for modern UI design.
- **Clerk:** User authentication and management.

## Contributing

We welcome contributions to FlashMaster! If you have suggestions or improvements, please fork the repository and create a pull request. For major changes, please open an issue to discuss the changes before making a pull request.

## Contact

For any questions or feedback, please reach out to [hassanakramali@gmail.com](mailto:hassanakramali@gmail.com).

---

Thank you for using FlashMaster. We hope it enhances your learning experience!