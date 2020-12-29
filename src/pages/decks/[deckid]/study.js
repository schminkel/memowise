import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Image from 'next/image'
import arrayShuffle from 'array-shuffle'

import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'

import { dump } from '@/utils/debug'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }

  return data
}

// returns an integer between minimum(inclusive) and maximum(exclusive).
const getRandomInt = (minimum, maximum) => {
  const min = Math.ceil(minimum)
  const max = Math.floor(maximum)
  return Math.floor(Math.random() * (max - min) + min)
}

const takeRandomItem = (arr = []) => (count = 1) => {
  const limit = count > arr.length ? arr.length : count
  const list = arr.slice()
  let result = []

  for (let i = 0; i < limit; i += 1) {
    const randomIdx = getRandomInt(0, list.length)
    result.push(list[randomIdx])
    list.splice(randomIdx, 1)
  }

  return result
}

// TODO:
// - to be the brains of pulling the next card.
const getNextCard = (cards = [], currentCardId) => {
  if (!cards.length) {
    return undefined
  }

  return currentCardId === undefined
    ? takeRandomItem(cards)().pop()
    : takeRandomItem(cards.filter((card) => card.id !== currentCardId))().pop()
}

const generateChoices = (currentCard, cards = [], options = {}) => {
  const field = options?.field || 'definition'

  return !currentCard
    ? []
    : [
        currentCard,
        ...takeRandomItem(cards.filter((card) => card.id !== currentCard.id))(
          2
        ),
      ].map((card) => ({
        id: card.id,
        text: card[field],
        isCorrectChoice: card.id === currentCard.id,
      }))
}

const StudyPage = () => {
  const [selectedChoice, setSelectedChoice] = useState(undefined)
  const [card, setCard] = useState(undefined)
  const [choices, setChoices] = useState([])
  const { query } = useRouter()
  const { data } = useSWR(
    () => query.deckid && `/api/decks/${query.deckid}`,
    fetcher
  )
  const isLoading = !data
  const { deck, topic, subTopic } = data || {}
  const crumbs =
    deck && topic && subTopic
      ? [
          { name: topic.name, path: `/browse/${topic.slug}`, isLink: true },
          {
            name: subTopic.name,
            path: `/browse/${topic.slug}/${subTopic.slug}`,
            isLink: true,
          },
          {
            name: deck.name,
            path: '',
            isLink: false,
          },
        ]
      : []

  const cardRef = useRef(card)
  cardRef.current = card

  useEffect(() => {
    setCard(getNextCard(deck?.cards))
  }, [deck])

  useEffect(() => {
    setChoices(arrayShuffle(generateChoices(card, deck?.cards)))
  }, [card, deck])

  useEffect(() => {
    let timer

    if (selectedChoice) {
      timer = setTimeout(() => {
        if (selectedChoice) {
          setCard(getNextCard(deck?.cards, cardRef.current.id))
          setChoices(
            arrayShuffle(generateChoices(cardRef.current, deck?.cards))
          )
          setSelectedChoice(undefined)
        }
      }, 1000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [selectedChoice])

  if (isLoading) return <Skeleton />

  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <Nav />
      <main>
        <header className="mt-10 mb-6">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 ">
            {deck.name}
          </h1>
          <p className="mb-4 text-xl font-normal tracking-tight text-gray-500">
            {deck.description}
          </p>
          <div className="flex items-center">
            <Image
              src="/me.jpg"
              alt="a pic of me"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="ml-3 font-semibold">David Valles</p>
          </div>
        </header>
        <Section>
          <div className="mb-8 space-y-6">
            <div className="p-4 ring-1 ring-gray-300 rounded-xl">
              <span className="text-xs text-gray-500 uppercase">term</span>
              <div className="flex justify-center py-14">
                <p>{card?.term}</p>
              </div>
            </div>
            <ul className="space-y-4">
              {choices.map((choice) => (
                <li
                  key={choice.id}
                  className="flex items-center justify-between px-4 py-4 shadow-sm ring-1 ring-blue-500 rounded-xl"
                  onClick={() => setSelectedChoice(choice)}
                >
                  <span>{choice.text}</span>
                  {selectedChoice &&
                    selectedChoice?.isCorrectChoice &&
                    selectedChoice?.id === choice.id && (
                      <svg
                        className="w-6 h-6 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  {selectedChoice &&
                    !selectedChoice?.isCorrectChoice &&
                    selectedChoice.id === choice.id && (
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </main>
      <footer></footer>
    </div>
  )
}

export default StudyPage

const Skeleton = () => {
  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <Nav />
      <main className="animate-pulse">
        <header className="mt-10 mb-6">
          <div className="w-3/4 h-4 mb-4 bg-gray-300 rounded"></div>
          <div className="w-1/2 mb-5 bg-gray-300 rounded h-9"></div>
          <div className="mb-4 space-y-2">
            <div className="w-full h-4 bg-gray-300 rounded"></div>
            <div className="w-full h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-300 rounded-full w-14 h-14"></div>
            <div className="w-1/4 h-6 ml-3 bg-gray-300 rounded"></div>
          </div>
        </header>
      </main>
    </div>
  )
}
