import Geocode from "react-geocode";

Geocode.setRegion("de");
const GEOCODE_API_KEY = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY!;
Geocode.setApiKey(GEOCODE_API_KEY);

export const getLatLng = async (address: string) => {
    try {
        const response = await Geocode.fromAddress(address)
        const { lat, lng } = response.results[0].geometry.location;
        return { lat, lng}
    } catch (error) {
        console.error(error);
        alert('Error finding location: the address might be incorrect');
    }
};
