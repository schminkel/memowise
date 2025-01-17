import Link from 'next/link'

import { HomeIcon } from '@/components/icons/home'

export const BreadCrumbs = ({ crumbs }) => {
  let mobileCrumb = { path: '/', name: 'Home' }

  if (crumbs.length > 1) {
    mobileCrumb = crumbs[crumbs.length - 2]
  }

  const MobileCrumb = () => (
    <Link href={mobileCrumb.path} className="leading-tight">
        <span className="mx-1 text-blue-600">&lt;- {mobileCrumb.name}</span>
    </Link>
  )

  const renderAllCrumbs = crumbs.map((crumb, idx) => (
    <div key={idx}>
      <div className="flex items-center">
        <span className="mx-1">/</span>
        {crumb.isLink ? (
          <Link href={crumb.path} className="leading-tight">
            <span className="mx-1 text-blue-600">{crumb.name}</span>
          </Link>
        ) : (
          <span className="mx-1 leading-tight">{crumb.name}</span>
        )}
      </div>
    </div>
  ))

  if (!crumbs.length) return null

  return (
    <div className="text-sm font-medium text-gray-500 pb-4">
      <div className="items-center hidden sm:flex">
        <Link href="/" aria-label="home page icon">
          <HomeIcon />
        </Link>
        {renderAllCrumbs}
      </div>
      <div className="sm:hidden">
        <MobileCrumb />
      </div>
    </div>
  )
}
