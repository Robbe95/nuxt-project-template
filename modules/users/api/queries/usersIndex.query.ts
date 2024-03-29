import { type ComputedRef } from 'vue'

import type { UseQueryReturnType } from '~/composables/query/query.composable'
import { useQuery } from '~/composables/query/query.composable'
import { usePaginationOptionsToApiParams } from '~/composables/table-pagination/pagination.composable'
import type { PaginationOptions } from '~/composables/table-pagination/tablePagination.composable'
import { TIME } from '~/constants/time.constant'
import type { UserIndex } from '~/models/users/index/userIndex.model'
import type { UserIndexFilters } from '~/models/users/index/userIndexFilters.model'
import type { PaginatedData } from '~/types/pagination.type'
import { QueryKey } from '~/types/query/queryKey.type'

import { userService } from '../services/user.service'

export function useUsersIndexQuery(
	paginationOptions: ComputedRef<PaginationOptions<UserIndexFilters>>
): UseQueryReturnType<PaginatedData<UserIndex>> {
	return useQuery<PaginatedData<UserIndex>>({
		staleTime: TIME.FIVE_MINUTES,
		queryKey: {
			key: QueryKey.USERS,
			params: usePaginationOptionsToApiParams(paginationOptions),
		},
		queryFn: () => {
			return userService.getAll(paginationOptions)
		},
	})
}
