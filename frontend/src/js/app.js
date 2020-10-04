import $ from 'jquery'
import axios from 'axios'

const API_ENDPOINT = 'https://asia-northeast1-ramen-search-291500.cloudfunctions.net/ramen_gacha'
let CACHE_COORDS = null
let CACHE_JSON = null

const SAMPLE_JSON = {
    html_attributions: [],
    next_page_token: "CrQCKgEAACDsZi4b92_bW6s5BtSjrDoN3Inbm9PlmxJH3ySjqRDSkJUYw9DOxrlgcbdXCDcAey0QOVGLkKryOujC9Wi_shFJ1XNDGMgL8o5fn9595aNpRJVaa_mjWQbVHVhzm7DdnwgnRbG45cbh-DnZC45cTJNlHfm_YsfLfknvVnmayGgckcfxHs835AADBSv5_lcJ641EA_X_zmdnRiBM3TK0_GWjW7zUCxPgiR8CtlsfkMWljPrz2Pl1Sy6nO-1kB8001nvKS0SsHBcWnFXloE-yOucpjLGcgXzwJjA5fp5GMn2oBaaCzoO3fptdhLQC0uqAIBGps3XQ0YnezdepyVvHzLGWAG5Y195yr6SW2WReVjsLI_HmhEVRKcr3gLl2ytGFpKuBcGYIXSITbzD4iCCVn0oSEMdUZsYqszgSJZ-lSIrzZM4aFNqs3fQERCeh_puFOGgMaPZkSY6W",
    results: [
        {
            business_status: "OPERATIONAL",
            geometry: {
                location: {
                    lat: 35.6935114,
                    lng: 139.6964717
                },
                viewport: {
                    northeast: {
                        lat: 35.69486122989272,
                        lng: 139.6978215298927
                    },
                    southwest: {
                        lat: 35.69216157010728,
                        lng: 139.6951218701072
                    }
                }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            name: "昌平 新宿西口店",
            opening_hours: {
                open_now: false
            },
            photos: [
                {
                    height: 4140,
                    html_attributions: [
                        '<a href="https://maps.google.com/maps/contrib/106578157969344885787">篠原みほ</a>'
                    ],
                    photo_reference: "CmRaAAAAse7-0I-SH1bSMrkyc_MSOmVB-YzftO_8bte3q7rJeQBSxI_WnJh1G2OMaONF6-BYPiFYzXzSH64rEkgXHcI1R5rLgikPi27kAQ278TrMIbBOF7z9ieTGsphGoP0Is_wtEhB4tW702Y6hl7JV73LqfEiZGhTXTf92Kar02bByHAvgI2Qbt7TO0Q",
                    width: 5520
                }
            ],
            place_id: "ChIJD8Nx1tTyGGAR1ZPmmY9LlQQ",
            plus_code: {
                compound_code: "MMVW+CH 新宿区、東京都",
                global_code: "8Q7XMMVW+CH"
            },
            price_level: 2,
            rating: 3.8,
            reference: "ChIJD8Nx1tTyGGAR1ZPmmY9LlQQ",
            scope: "GOOGLE",
            types: [
                "restaurant",
                "food",
                "point_of_interest",
                "establishment"
            ],
            user_ratings_total: 340,
            vicinity: "新宿区西新宿７丁目１２−４"
        },
        {
            business_status: "OPERATIONAL",
            geometry: {
                location: {
                    lat: 35.6930943,
                    lng: 139.7021953
                },
                viewport: {
                    northeast: {
                        lat: 35.69445587989272,
                        lng: 139.7035066298927
                    },
                    southwest: {
                        lat: 35.69175622010728,
                        lng: 139.7008069701073
                    }
                }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            name: "桂花ラーメン 新宿ふぁんてん",
            opening_hours: {
                open_now: true
            },
            photos: [
                {
                    height: 2832,
                    html_attributions: [
                        '<a href="https://maps.google.com/maps/contrib/116384354576242200378">桂花ラーメン 新宿ふぁんてん</a>'
                    ],
                    photo_reference: "CmRaAAAAzuWf2mwpxRkiHjBt3mZk4fROoyWyPRfRHGXpM8gHZtgxfQz8uo-SMRxJRA4wimsoHvJ4AP5z8c_zOuTmx7QSIeJ1z9sph47QHrlIKBpJEP2o1xvVd6qhmm_Jw3RMscirEhCgJ3GDySkvBragSjtNva56GhSpM3yLY7bq6d3KI2hk1IzzFV6lqQ",
                    width: 4256
                }
            ],
            place_id: "ChIJra9B8NmMGGARjdhcSShLnOA",
            plus_code: {
                compound_code: "MPV2+6V 新宿区、東京都",
                global_code: "8Q7XMPV2+6V"
            },
            price_level: 3,
            rating: 3.9,
            reference: "ChIJra9B8NmMGGARjdhcSShLnOA",
            scope: "GOOGLE",
            types: [
                "meal_takeaway",
                "restaurant",
                "food",
                "point_of_interest",
                "store",
                "establishment"
            ],
            user_ratings_total: 796,
            vicinity: "新宿区新宿３丁目２１−４ B1,B2F 第2サンパークビル"
        },
    ],
    status: "OK"
}

function showRamen(ramenRestaurant) {
    setTimeout(() => {
        var url = `https://www.google.com/maps/search/?api=1&query=${ramenRestaurant.name}&query_place_id=${ramenRestaurant.place_id}`

        var r = $('#ramen')
        r.attr("href", url)

        var title = $('#ramenTitle')
        title.empty()
        title.append(ramenRestaurant.name)

        var rating = $('#ramenRating')
        rating.empty()
        rating.append(`★ ${ramenRestaurant.rating}`)

        r.removeClass('invisible')    
    }, 1000)
}

function hideRamen() {
    var r = $('#ramen')
    r.addClass('invisible')
    r.attr('href', '')
}

async function updateRamenListCache(coords) {
    var latlng = `${coords.latitude},${coords.longitude}` 
    console.log(`update: ${latlng}`)

    var r = await axios({
        method: 'get',
        url: `${API_ENDPOINT}?latlng=${latlng}`,
        responseType: 'json',
    })
    CACHE_JSON = r.data.results
    
    //CACHE_JSON = SAMPLE_JSON.results
    CACHE_COORDS = coords
}

function isCacheCoordsCloseToCoords(coords) {
    if (CACHE_COORDS) {
        var latDelta = Math.abs(CACHE_COORDS.latitude - coords.latitude)
        var lngDelta = Math.abs(CACHE_COORDS.longitude - coords.longitude)
        return latDelta < 1500 && lngDelta < 1500
    } else {
        return false
    }
}

async function showRamenRestaurant(geolocationPosition) {
    try {
        var coords = geolocationPosition.coords
        if (!isCacheCoordsCloseToCoords(coords)) {
            await updateRamenListCache(coords)
        }

        if (CACHE_JSON.length === 0) {
            alert("このエリアにラーメン屋が見つかりませんでした")
        } else {
            var index = Math.floor(Math.random() * CACHE_JSON.length)
            var ramenRestaurant = CACHE_JSON[index]
            showRamen(ramenRestaurant)
        }
    } catch (error) {
        showError(error)
    }
}

function showError(e) {
    console.log(e)
    alert("エラーが発生しました")
}

$(document).ready(() => {
    const button = $('#gachaButton')
    button.on('click', (e) => {
        navigator.geolocation.getCurrentPosition(showRamenRestaurant, showError)
        hideRamen()
    })
})