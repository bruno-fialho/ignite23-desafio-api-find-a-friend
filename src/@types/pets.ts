import {
  Age,
  Energy,
  Environment,
  Independence,
  Size,
  Type,
} from '@prisma/client'
import { z } from 'zod'

const TypeEnum = z.nativeEnum(Type)
export type PetType = z.infer<typeof TypeEnum>

const AgeEnum = z.nativeEnum(Age)
export type PetAge = z.infer<typeof AgeEnum>

const SizeEnum = z.nativeEnum(Size)
export type PetSize = z.infer<typeof SizeEnum>

const EnergyEnum = z.nativeEnum(Energy)
export type PetEnergy = z.infer<typeof EnergyEnum>

const IndependenceEnum = z.nativeEnum(Independence)
export type PetIndependence = z.infer<typeof IndependenceEnum>

const EnvironmentEnum = z.nativeEnum(Environment)
export type PetEnvironment = z.infer<typeof EnvironmentEnum>
