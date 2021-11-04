import { providers, BigNumber } from 'ethers'
import { bignumber, BigNumber as MathBigNumber } from 'mathjs'
import { getErc20Instance, getAddressRegistryInstance } from '../common'

const UNISWAP_LP = '0xAb2E6375623CDA1ea7950e38A6cF026d059B9791'
const WETH = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'

export const getDevBalanceOfLiquidityPool = async (
	l2Provider: providers.BaseProvider
): Promise<MathBigNumber> => {
	const addressRegistryInstance = await getAddressRegistryInstance(l2Provider)
	const devTokenAddress: string = await addressRegistryInstance.registries(
		'Dev'
	)
	const devInstance = getErc20Instance(devTokenAddress, l2Provider)
	const balance: BigNumber = await devInstance.balanceOf(UNISWAP_LP)
	return bignumber(balance.toString())
}

export const getWEthBalanceOfLiquidityPool = async (
	l2Provider: providers.BaseProvider
): Promise<MathBigNumber> => {
	const wEthInstance = getErc20Instance(WETH, l2Provider)
	const balance: BigNumber = await wEthInstance.balanceOf(UNISWAP_LP)
	return bignumber(balance.toString())
}
