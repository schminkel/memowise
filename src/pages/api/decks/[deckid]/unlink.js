import { getSession } from 'next-auth/client'

import { updateUser } from '@/lib/data'

//------------------------------------------------------------------------------
// Handler for api calls to `/api/deck/:deckid/link`
//------------------------------------------------------------------------------
export default async (req, res) => {
  const deckId = req.query.deckid

  if (req.method === 'POST') {
    const session = await getSession({ req })

    if (!session) {
      return res.status(401).send('Unauthorized')
    }

    await updateUser(session.user.id, { unlinked: { deckId } })

    return res.status(200).json({})
  }

  res.status(404).send(`Unsupported method: ${req.method}`)
}
