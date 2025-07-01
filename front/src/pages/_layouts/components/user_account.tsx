import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/api/get-user'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import { Skeleton } from '@/components/ui/skeleton'
import { fallBackAvatar } from '@/helper/fallback-avatar'

export function UserAccount() {

  const { data: user, isPending: isPendingUser } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })

  return (
    <div className="flex items-center gap-2">
      {!isPendingUser && user && (
        <>
          <Avatar className='h-9 w-9 rounded-full text-xs font-semibold'>
            <AvatarFallback className="rounded-lg">
              {fallBackAvatar({ name: user.name })}
            </AvatarFallback>
          </Avatar>
          <span>{user.name}</span>
        </>
      )}
      {
        isPendingUser && (
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-5 w-16" />
          </div>
        )
      }
    </div>
  )
}
