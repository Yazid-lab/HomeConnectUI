import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useAuth } from "../../auth/contexts/AuthProvider";
import useAds from "../hooks/useAds";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Rent.css";
import AdsList from "../components/AdsList";
import ReactPaginate from "react-paginate";
import { Ad } from "../types/ad";
import { all } from "axios";

export default function Rent() {
  const { userInfo } = useAuth();
  const allAds = useAds();
  const [priceFilter, setPriceFilter] = useState("");
  const [roomFilter, setRoomFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [adTypeFilter, setadTypeFilter] = useState("Rent");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filteredAds, setFilteredAds] = useState<Ad[]>(allAds!);

  const itemsPerPage = 10;

  const pageCount = filteredAds
    ? Math.ceil(filteredAds.length / itemsPerPage)
    : 0;

  const offset = currentPage * itemsPerPage;
  const paginatedAds = filteredAds
    ? filteredAds.slice(offset, offset + itemsPerPage)
    : allAds;
  console.log(paginatedAds, allAds, filteredAds);
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleFilterClick = () => {
    let filteredByAdType: Ad[] = allAds!;
    if (adTypeFilter === "Rent") {
      filteredByAdType = allAds!.filter((ad) => ad.adType === 0);
    } else if (adTypeFilter === "Buy") {
      filteredByAdType = allAds!.filter((ad) => ad.adType === 1);
    }

    let filteredByPrice: Ad[] = [];
    if (priceFilter === "") {
      filteredByPrice = filteredByAdType;
    } else {
      filteredByPrice = allAds!.filter((ad) => {
        return ad.price <= parseFloat(priceFilter);
      });
    }

    let filteredByRooms: Ad[] = [];
    if (roomFilter === "") {
      filteredByRooms = filteredByPrice;
    } else {
      filteredByRooms = filteredByPrice.filter((ad) => {
        return ad.nbRooms >= parseInt(roomFilter, 10);
      });
    }

    // Filter ads based on the city filter
    let filteredByCity: Ad[] = [];
    if (cityFilter === "") {
      filteredByCity = filteredByRooms;
    } else {
      filteredByCity = filteredByRooms.filter((ad) => {
        // Modify this condition as needed for your filtering logic
        return ad.address.town.toLowerCase().includes(cityFilter.toLowerCase());
      });
    }

    setCurrentPage(0);
    setFilteredAds(filteredByCity);
  };

  const handleClearFilters = () => {
    // Reset all filter values to their default state
    setPriceFilter("");
    setRoomFilter("");
    setCityFilter("");
    setCurrentPage(0);
    setFilteredAds(allAds!);
  };

  return (
    <>
      <Container
        maxWidth="xl"
        style={{ marginBottom: "5em", marginTop: "5em" }}
      >
        <Typography variant="h4" gutterBottom>
          Real Estate Adverts
        </Typography>

        <TextField
          label="Filter by Price"
          size="small"
          variant="outlined"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          style={{ marginRight: "1em" }}
        />

        <TextField
          label="Filter by Number of Rooms"
          size="small"
          variant="outlined"
          value={roomFilter}
          onChange={(e) => setRoomFilter(e.target.value)}
          style={{ marginRight: "1em" }}
        />

        <TextField
          label="Filter by City"
          size="small"
          variant="outlined"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          style={{ marginRight: "1em" }}
        />
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="adType"
            name="adType"
            value={adTypeFilter}
            onChange={(e) => setadTypeFilter(e.target.value)}
          >
            <FormControlLabel value="Rent" control={<Radio />} label="Rent" />
            <FormControlLabel value="Buy" control={<Radio />} label="Buy" />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterClick}
          style={{ marginRight: "1em" }}
        >
          Apply Filters
        </Button>

        {/* Clear Filters button */}
        <Button variant="outlined" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </Container>

      <AdsList adverts={paginatedAds!} />
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
}
