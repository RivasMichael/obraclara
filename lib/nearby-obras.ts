export interface Coordinates {
  latitud: number;
  longitud: number;
}

export interface NearbyObra<T extends Coordinates> {
  obra: T;
  distanciaKm: number;
}

const EARTH_RADIUS_KM = 6371;
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export function haversineDistanceKm(origin: Coordinates, destination: Coordinates): number {
  const latitudeDelta = toRadians(destination.latitud - origin.latitud);
  const longitudeDelta = toRadians(destination.longitud - origin.longitud);
  const originLatitude = toRadians(origin.latitud);
  const destinationLatitude = toRadians(destination.latitud);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(haversine));
}

export function findNearbyObras<T extends Coordinates>(origin: Coordinates, obras: T[], limit = 3): NearbyObra<T>[] {
  if (!Number.isFinite(origin.latitud) || !Number.isFinite(origin.longitud)) {
    throw new Error("Las coordenadas recibidas no son válidas.");
  }

  return obras
    .map((obra) => ({
      obra,
      distanciaKm: haversineDistanceKm(origin, {
        latitud: obra.latitud,
        longitud: obra.longitud,
      }),
    }))
    .sort((left, right) => left.distanciaKm - right.distanciaKm)
    .slice(0, Math.max(0, limit));
}
