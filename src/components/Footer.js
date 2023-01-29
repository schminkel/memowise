import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="py-12 border-t bg-gray-50">
      <div className="px-4 sm:px-8 md:px-24 lg:px-36 xl:px-52 divide-y divide-gray-200">
        {/*
        <ul className="pb-12 grid gap-5 grid-cols-1 sm:grid-cols-3 gap-y-10">
          <li className="space-y-5">
            <h4 className="font-semibold text-gray-500 uppercase">Topics</h4>
            <ul className="text-gray-500 space-y-4">
              <li>
                <Link href="/browse/math" className="hover:text-blue-600">
                  Math
                </Link>
              </li>
              <li>
                <Link href="/browse/languages" className="hover:text-blue-600">
                  Languages
                </Link>
              </li>
              <li>
                <Link href="/browse/science" className="hover:text-blue-600">
                  Science
                </Link>
              </li>
              <li>
                <Link href="/browse/all-the-things" className="hover:text-blue-600">
                  All The Things
                </Link>
              </li>
            </ul>
          </li>
          <li className="space-y-5">
            <h4 className="font-semibold text-gray-500 uppercase">Features</h4>
            <ul className="text-gray-500 space-y-4">
              <li>
                <Link href="/features#browse" className="hover:text-blue-600">
                  Browse Topics & Flashcards
                </Link>
              </li>
              <li>
                <Link href="/features#quiz" className="hover:text-blue-600">
                  Flashcard Quiz
                </Link>
              </li>
              <li>
                <Link href="/features#create" className="hover:text-blue-600">
                  Create Flashcards
                </Link>
              </li>
              <li>
                <Link href="/features#personalize" className="hover:text-blue-600">
                  Personalized Collection
                </Link>
              </li>
            </ul>
          </li>
          <li className="space-y-5">
            <h4 className="font-semibold text-gray-500 uppercase">About</h4>
            <ul className="text-gray-500 space-y-4">
              <li>
                <Link href="/about#how" className="hover:text-blue-600">
                  How I Built MemoWise
                </Link>
              </li>
              <li>
                <Link href="/about#algorithm" className="hover:text-blue-600">
                  Study Algorithm
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        */}
        <div className="text-center">
          <p className="text-base font-medium text-gray-500">
            Made with ☕️☕️☕️ by{' '}
            <Link
              href="https://dtjv.io"
              className="font-semibold text-gray-900 hover:text-blue-600"
            >
              David Valles
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
