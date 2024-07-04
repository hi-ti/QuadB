import { Box, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Review from "../../Components/Review";

const Heading = styled(Typography)(({ theme }) => ({
  padding: "24px 0px 0px 0px",
  fontWeight: "600",
  fontSize: "24px",
  fontFamily: "sans-serif,nunito",
}));
const Body = styled(Typography)(({ theme }) => ({
  padding: "24px 0px 0px 0px",
  fontSize: "20px",
  fontFamily: "sans-serif,nunito",
}));

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          paddingY: "32px",
        }}
      >
        <Box
          sx={{
            width: { md: "60%", lg: "60%", xl: "60%", sm: "70%", xs: "90%" },
            padding: "16px 0px 32px 0px",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "48px",
              fontWeight: "600",
              width: "100%",
              marginBottom: "32px",
            }}
          >
            About Us
          </Typography>
          <Box>
            <Body>Et me explicabo, alias commodi aspernatur dolore eveniet. Velit iusto sed sequi, quam quas, ab voluptatem distinctio iusto quia aspernatur reiciendis inventore eaque. Iure atque doloribus aliquid deserunt error tempora libero quae iure laboriosam. </Body>
            <Body>
              Earum consequatur harum nemo quam culpa, minus sequi consectetur? Expedita vero inventore quaerat vel, maiores harum, ipsam pariatur unde dolores nisi laudantium iusto eius, est? Numquam modi ex exercitationem, rem dignissimos dolor sequi aperiam totam distinctio ut tempore porro id pariatur? Veniam laborum tempore recusandae exercitationem itaque doloremque quod, odit et amet rerum ad perferendis laborum est minus. Enim dolores qui magni et rem placeat at est! </Body>
            <Heading>Id assumenda quos</Heading>
            <Body>
              Omnis sapiente id, architecto quidem placeat iure, ex aliquid non deserunt earum explicabo perferendis odio dolorem ut consequatur ullam quos? Nobis consectetur repellat asperiores distinctio eius reprehenderit eos exercitationem aliquam accusantium maiores tempora aut minima libero tenetur, sequi consectetur voluptatem, earum? Labore unde dolorum illo distinctio eveniet, officiis dicta, molestias quisquam animi perspiciatis sequi dignissimos voluptatem non quod doloremque tempora! Fuga quos vitae blanditiis fugit incidunt dignissimos deserunt quia. Eum, est aspernatur! </Body>
            <Body>
              Ex doloremque dolorem ipsam! Atque sit inventore harum distinctio labore maxime aperiam quod optio, fugiat repellendus earum incidunt at similique, eum molestiae autem fuga! Sed assumenda doloremque nemo, laudantium rem accusantium asperiores itaque animi, perferendis consectetur, quam! Nihil qui suscipit expedita error, ipsum magnam repellendus autem. Quod nemo id iure quae ducimus laboriosam distinctio iste unde ab consequatur nostrum enim quia, ratione est voluptas! Sit, tempora, impedit! </Body>
            <Body>
              Eos inventore rem vitae quasi maiores a ullam? Voluptate doloremque alias numquam ab eum odio itaque, nulla eveniet consequuntur. Repellat neque iure harum vel omnis quidem nemo iusto hic ea quibusdam consectetur accusamus accusantium, facilis, natus perferendis dignissimos, quod saepe quas? Consequatur iste vero nobis sunt quidem, eaque eveniet accusantium expedita magnam, deleniti repellendus saepe recusandae dolore, mollitia quibusdam nesciunt doloremque reprehenderit voluptate fugiat! </Body>
          </Box>
        </Box>
      </Box>
      <Review />
    </>
  );
}

export default About;
