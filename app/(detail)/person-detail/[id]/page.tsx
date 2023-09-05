import fetchData from "@/config/fetch";
import type { Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import FetchedDetector from "@/components/utils/FetchedDetector";
import GradientBackground from "@/components/utils/GradientBackground";
import Media from "../../Media";
import { PersonDetailType } from "../person-type";
import { CombinedCreditsType } from "../combined-credits-types";
import ReadMoreLess from "@/components/utils/ReadMoreLess";
import genders from "@/utils/genders";
import { calculateAge, calculateAgeAtDeath } from "@/utils/calculate-age";
import CombinedCredits from "../CombinedCredits";

type Props = {
  params: { id: string };
};

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const people = await fetchData(`/person/popular?language=en-US&page=1`).then(
    (res) => res.json()
  );
  const popularPeople = people?.results;

  return popularPeople.map(({ id, name }: any) => ({
    id: `${id}-${name.toLowerCase().replaceAll(" ", "-")}`,
  }));
}

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata> => {
  const personId = id.split("-")[0];
  const person: PersonDetailType = await fetchData(`/person/${personId}`).then(
    (res) => {
      if (!res.ok) {
        notFound();
      }
      return res.json();
    }
  );

  const personName = person.name;
  const personDescription = person?.biography || `Explore about ${personName}`;
  const profilePath = person.profile_path;

  return {
    title: personName,
    description: personDescription,
    openGraph: {
      title: personName,
      description: personDescription,
      images: profilePath
        ? `https://image.tmdb.org/t/p/w1280/${profilePath}`
        : "/opengraph-image.png",
    },
  };
};

export const revalidate = 1800;

export default async function Person({ params: { id } }: Props) {
  const personId = id.split("-")[0];
  const {
    name,
    profile_path,
    place_of_birth,
    biography,
    birthday,
    deathday,
    gender,
    also_known_as,
    known_for_department,
  }: PersonDetailType = await fetchData(`/person/${personId}`).then((res) =>
    res.json()
  );

  const combinedCredits: CombinedCreditsType = await fetchData(
    `/person/${personId}/combined_credits?language=en-US`
  ).then((res) => res.json());

  const genderName = genders[gender] || "Unknown";

  return (
    <Box position="relative">
      <Box
        component="div"
        className="background-ani"
        sx={{
          width: 1,
          borderBottom: "solid 1px",
          borderBottomColor: "primary.main",
        }}
      >
        <GradientBackground
          darker
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: 350,
          }}
        >
          <Container>
            <Box my={{ xs: 0, md: 2 }}>
              <Box component="div" className="row g-5">
                <Box
                  component="div"
                  className="col-12 col-md-auto"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Media
                    poster_path={profile_path}
                    alt={name}
                    sx={{ my: { xs: 2, md: 0 } }}
                  />
                </Box>
                <Box component="div" className="col-12 col-md">
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {name}
                    </Typography>

                    <Box
                      component="div"
                      className="department-wrapper"
                      my={1}
                      sx={{ position: "static", display: "inline-block" }}
                    >
                      <Typography
                        className="department"
                        variant="body2"
                        component="span"
                      >
                        {known_for_department}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      gap={2}
                      mt={1}
                      flexDirection={{ xs: "column", sm: "row" }}
                    >
                      <Box>
                        <Typography fontWeight={500}>Birthday</Typography>
                        <Typography variant="body2">
                          {birthday ? birthday.replaceAll("-", "/") : "N/A"}{" "}
                          {!deathday && birthday && (
                            <>({calculateAge(birthday)} years old)</>
                          )}
                        </Typography>
                      </Box>
                      {deathday && (
                        <Box>
                          <Typography fontWeight={500}>Day of death</Typography>
                          <Typography variant="body2">
                            {deathday.replaceAll("-", "/")}{" "}
                            {birthday && (
                              <>
                                ({calculateAgeAtDeath(birthday, deathday)} years
                                old)
                              </>
                            )}
                          </Typography>
                        </Box>
                      )}
                      <Box>
                        <Typography fontWeight={500}>Gender</Typography>
                        <Typography variant="body2">{genderName}</Typography>
                      </Box>
                      <Box>
                        <Typography fontWeight={500}>Place of Birth</Typography>
                        <Typography variant="body2">
                          {place_of_birth}
                        </Typography>
                      </Box>
                    </Box>

                    <Box mt={2}>
                      <Typography fontWeight={500}>Also know as</Typography>
                      <Typography variant="body2">
                        {also_known_as && also_known_as.length
                          ? also_known_as.join(", ")
                          : "--"}
                      </Typography>
                    </Box>

                    <Box my={2}>
                      {biography && (
                        <>
                          <Typography variant="h6">Biography</Typography>
                          <Typography color="action.active" fontWeight={300}>
                            <ReadMoreLess
                              content={biography}
                              totalContentLengthToDisplay={500}
                              maxLengthLimit={600}
                            />
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </GradientBackground>
      </Box>
      <Box my={5}>
        <CombinedCredits data={combinedCredits} />
      </Box>
      <FetchedDetector />
    </Box>
  );
}
